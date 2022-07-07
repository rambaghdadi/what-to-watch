import { Button, PasswordInput, TextInput } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { At, Hash } from "tabler-icons-react"
import Header from "../components/Header/Header"
import { useAuth } from "../context/authContext"

export default function Signup(props) {
	const router = useRouter()
	const email = useRef()
	const password = useRef()
	const { userToken, setUserToken } = useAuth()

	useEffect(() => {
		if (userToken) router.replace("/")
	}, [])

	async function formHandler(e) {
		e.preventDefault()
		const formData = {
			email: email.current.value,
			password: password.current.value,
		}
		try {
			const response = await fetch(
				`https://node-what-to-watch.herokuapp.com/api/signin`,
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const data = await response.json()
			localStorage.setItem("token", data.token)
			localStorage.setItem("userId", data.userId)
			setUserToken(data.token)
		} catch (error) {
			console.error(error)
		} finally {
			router.push("/")
		}
	}

	return (
		<>
			<Header />
			<div className="signin">
				<h1>Sign In</h1>
				<form onSubmit={formHandler}>
					<TextInput
						icon={<At size={14} />}
						placeholder="Your Email"
						label="Email"
						required
						type="email"
						id="email"
						ref={email}
					/>
					<PasswordInput
						icon={<Hash size={14} />}
						placeholder="Password"
						label="Password"
						ref={password}
						id="password"
						required
					/>
					<Button type="submit">Submit</Button>
				</form>
			</div>
		</>
	)
}

//TODO forgot password? functionality
