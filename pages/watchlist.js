import { useEffect, useState } from "react"
import Card from "../components/Card/Card"
import Header from "../components/Header/Header"
import Notification from "../components/Notification"
import CardGrid from "../components/UI/CardGrid"
import { useAuth } from "../context/authContext"

export default function Watchlist(props) {
	const [savedList, setSavedList] = useState([])
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [notification, setNotification] = useState(false)
	const { userToken } = useAuth()
	useEffect(() => {
		console.log(userToken)
		getWatchlist()
	}, [])

	async function getWatchlist() {
		try {
			setLoading(true)
			const response = await fetch(
				`https://node-what-to-watch.herokuapp.com/api/watchlist`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			)
			if (!response.ok) throw new Error("Error")
			const data = await response.json()
			setSavedList(data.items)
			setError(false)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setError(true)
			console.error(error)
		}
	}

	//TODO add UI when nothing in watchlist

	async function removeFromWatchList(e, id) {
		e.preventDefault()
		try {
			const response = await fetch(
				`https://node-what-to-watch.herokuapp.com/api/watchlist/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			)
			const data = await response.json()
			setSavedList((prev) => {
				return prev.filter((x) => x._id !== id)
			})
			setNotification(data.message)
		} catch (error) {
			setNotification("Error, please try again later.")
			console.error(error)
		}
	}

	return (
		<div>
			<Header />
			{notification && (
				<Notification
					text={notification}
					onClick={() => setNotification(false)}
				/>
			)}
			{savedList.length === 0 ? (
				<div
					style={{
						padding: "0 2rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "calc(100vh - 84px)",
					}}
				>
					<h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>
						Your watchlist is currently empty. Save the movies or series you
						would like to watch later here!
					</h1>
				</div>
			) : (
				<CardGrid>
					{!error &&
						!loading &&
						savedList.map((x) => (
							<Card
								key={x._id}
								src={x.imageUrl ? x.imageUrl : "images/na.png"}
								title={x.title}
								year={x.year}
								rating={x.rating}
								streamingInfo={x.streamingInfo[0]}
								director={x.director}
								cast={x.cast}
								overview={x.overview}
								runtime={x.runtime === "undefined min" ? "" : x.runtime}
								age={x.age === "-1" || !x.age ? null : `${x.age}+`}
								genres={x.genres}
								link={x.link}
								onAddWatchlist={(e) => {
									removeFromWatchList(e, x._id)
								}}
							/>
						))}
				</CardGrid>
			)}
		</div>
	)
}
