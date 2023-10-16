const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			progressPercentage: 0,
			message: null,
			error: null,
			isLoginSuccess: false,
			isSignup: false,
			isPasswordRecovery: false,
			isChangePassword: false,
			isForgotPassword: false,
			isPasswordReset: false,
			user: [],
			donations: [],
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
			],
			chatBotReply: '',
			products: [
				{ id: "price_1NvRPvEkSwAVwyol4daWiYZ4", name: "60 donation" },
				{ id: "price_1NvROvEkSwAVwyolL8AZYT4V", name: "30 donation" },
				{ id: "price_1NvRNpEkSwAVwyol83js5tiq", name: "20 donation" },
				{ id: "price_1NvRLqEkSwAVwyolh2Jdmnqb", name: "10.00 donation" },
				{ id: "price_1NvRJCEkSwAVwyol9ThQzuHUcd", name: "custom donation" }
			],
		},

		actions: {
			checkout: async (productId) => {
				const product = getStore().products.find(p => p.id === productId);
				if (!product) {
					console.error("Product not found");
					return;
				}

				try {
					const response = await fetch(process.env.BACKEND_URL + '/payment', {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ items: [{ name: product.name, id: product.id }] })
					});

					const data = await response.json();

					if (data.url) {
						window.location.assign(data.url); // Forwarding user to Stripe
					}
				} catch (error) {
					console.error("Checkout error:", error);
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				// try {
				// 	// fetching data from the backend
				// 	const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
				// 	const data = await resp.json()
				// 	setStore({ message: data.message })
				// 	// don't forget to return something, that is how the async resolves
				// 	return data;
				// } catch (error) {
				// 	console.log("Error loading message from backend", error)
				// }
			},
			getToken: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.access_token) {
						localStorage.setItem('access_token', data.access_token)
						localStorage.setItem('user_id', data.user_id)
						setStore({ isLoginSuccess: true })
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 2000)
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
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isSignup: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 2000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 2000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changePassword: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/updatePassword", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isChangePassword: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 2000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 2000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			fetchAllDonation: () => {

				fetch(process.env.BACKEND_URL + "/api/progress")
					.then((response) => {
						if (!response.ok) {
							throw new Error("Network response was not ok");
						}
						return response.json();
					})
					.then((data) => {
						const { progress } = data;
						setStore({ progressPercentage: progress });
					})
					.catch((error) => {
						console.error("Error fetching progress data:", error);
					});
			},

			fetchEachDonation: () => {
				const user_id = localStorage.getItem("user_id")
				fetch(process.env.BACKEND_URL + `/api/donations/user/${user_id}`)
					.then(resp => resp.json())
					.then(data => setStore({ donations: data }))
					.catch(error =>
						console.log(error)
					)
			},

			getUser: () => {
				const user_id = localStorage.getItem("user_id")
				fetch(process.env.BACKEND_URL + `/api/user/${user_id}`)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setStore({ user: data })
					})
			},
			editObject: (newObj) => {
				fetch(process.env.BACKEND_URL + `/api/user`, {
					method: 'PUT',
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(newObj)
				})
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setStore({ user: data })
					})
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
			},
			requestForgotPassword: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/request_reset_password", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isForgotPassword: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 20000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 20000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			resetPassword: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/reset_password", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isPasswordReset: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 5000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 20000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			sendChat: async (msg) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/chat", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify({
							content: msg
						})
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ chatBotReply: data.msg })
					}
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
