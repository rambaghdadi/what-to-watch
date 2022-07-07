import "../styles/globals.css"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import AuthContextProvider from "../context/authContext"

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	return (
		<AuthContextProvider>
			<Component {...pageProps} />
			<Footer />
		</AuthContextProvider>
	)
}

export default MyApp
