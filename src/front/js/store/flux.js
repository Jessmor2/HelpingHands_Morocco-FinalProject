const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			products:[
				    {id:"price_1NvRPvEkSwAVwyol4daWiYZ4",name: "60 donation"},
                      {id:"price_1NvROvEkSwAVwyolL8AZYT4V", name: "30 donation"  },
					  {id: "price_1NvRNpEkSwAVwyol83js5tiq",name: "20 donation"},
					  {name: "10 donation", id: "price_1NvRLqEkSwAVwyolh2Jdmnqb"},
					  {name: "custom donation", id: "price_1NvRJCEkSwAVwyol9ThQzuHUcd"}
				     ],

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
             checkout: async () => {
				await fetch('https://super-waffle-6j6p6j47xxrh4jq6-4000.app.github.dev/checkout', {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({items: [ {name: "10 donation", id: "price_1NvRLqEkSwAVwyolh2Jdmnqb"}]})
				}).then((response) => {
					return response.json();
				}).then((response) => {
					if(response.url) {
						window.location.assign(response.url); // Forwarding user to Stripe
					}
				});
			},

			getToken: async (obj) => {
				console.log("test")
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.access_token) {
						localStorage.setItem('access_token', data.access_token)
					}
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			createAccount: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
