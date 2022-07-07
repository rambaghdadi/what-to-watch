import { Button, PasswordInput, TextInput } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { At, Hash } from "tabler-icons-react"
import Header from "../components/Header/Header"
import { useAuth } from "../context/authContext"

export default function Signup(props) {
	const router = useRouter()
	const name = useRef()
	const email = useRef()
	const password = useRef()
	const { userToken } = useAuth()

	useEffect(() => {
		if (userToken) router.replace("/")
	}, [])

	async function handleSubmit(e) {
		e.preventDefault()
		const formData = {
			name: name.current.value,
			email: email.current.value,
			password: password.current.value,
		}
		try {
			const response = await fetch(
				`https://node-what-to-watch.herokuapp.com/api/signup`,
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			router.replace("/signin")
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<Header />
			<div onSubmit={handleSubmit} className="signup">
				<h1>Sign Up</h1>
				<form>
					<TextInput
						placeholder="Your name"
						label="Full name"
						id="name"
						required
						ref={name}
					/>
					<TextInput
						ref={email}
						icon={<At size={14} />}
						placeholder="Your Email"
						label="Email"
						id="email"
						required
						type="email"
					/>
					<PasswordInput
						ref={password}
						placeholder="Password"
						label="Password"
						id="password"
						description="Password must include at least one letter, number and special character"
						required
						icon={<Hash size={14} />}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</div>
		</>
	)
}
