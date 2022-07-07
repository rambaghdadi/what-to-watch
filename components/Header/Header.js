import classes from "./Header.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../../context/authContext"

export default function Header(props) {
	const router = useRouter()
	const { userToken, setUserToken } = useAuth()

	function signout() {
		setUserToken(false)
		localStorage.removeItem("token")
		localStorage.removeItem("userId")
		setTimeout(() => {
			router.push("/signin")
		}, 100)
	}

	return (
		<div
			className={
				router.asPath === "/"
					? classes.header
					: `${classes.header} ${classes.notHome}`
			}
		>
			<div className={classes.main}>
				<div className={classes.logo} onClick={() => router.push("/")}>
					<div className={classes.play}></div>
					<p>What&apos;s On?</p>
				</div>
				<nav className={classes.navbar}>
					{userToken ? (
						<>
							<Link href={"/watchlist"}>
								<a>Watchlist</a>
							</Link>
							<button onClick={signout}>Sign Out</button>
						</>
					) : (
						<>
							<Link href={"/signin"}>
								<a>Sign In</a>
							</Link>
							<Link href={"/signup"}>
								<a>Sign Up</a>
							</Link>
						</>
					)}
				</nav>
			</div>
		</div>
	)
}

//TODO sign in icon for "add to list"
//TODO search icon for "movie/series search"

//TODO ask ashi why this isn't refreshing
