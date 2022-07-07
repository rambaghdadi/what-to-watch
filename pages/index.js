import { useCallback, useRef, useState } from "react"
import Card from "../components/Card/Card"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Middler from "../components/Middler/Middler"
import ModifySearch from "../components/ModifySearch"
import Notification from "../components/Notification"
import Scroll from "../components/Scroll"
import Spinner from "../components/Spinner"
import CardGrid from "../components/UI/CardGrid"
import genresCodes from "../lib/Genres"
import { useAuth } from "../context/authContext"

export default function Home() {
	const [initial, setInitial] = useState(true)
	const [watchlist, setWatchlist] = useState(null)
	const [drawer, setDrawer] = useState(false)
	const [page, setPage] = useState(1)
	const [maxPages, setMaxPages] = useState(0)
	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(false)
	const [update, setUpdate] = useState(false)
	const [error, setError] = useState("")
	const [movieOrSeries, setMovieOrSeries] = useState("series")
	const [streamingService, setStreamingService] = useState("netflix")
	const [genre, setGenre] = useState("18")
	const { userToken, setUserToken } = useAuth()

	const observer = useRef()
	const lastItem = useCallback(
		(node) => {
			if (loading) return
			if (page > maxPages) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) getStreamingData()
			})
			if (node) observer.current.observe(node)
		},
		[loading]
	)

	async function getStreamingData() {
		try {
			setError("")
			setLoading(true)
			const response = await fetch(
				`https://streaming-availability.p.rapidapi.com/search/basic?country=gb&service=${streamingService}&type=${movieOrSeries}&genre=${genre}&page=${page}&output_language=en&language=en`,
				{
					method: "GET",
					headers: {
						"X-RapidAPI-Key":
							process.env.NEXT_PUBLIC_RAPIDAPIKEY || process.env.RAPIDAPIKEY,
						"X-RapidAPI-Host":
							process.env.NEXT_PUBLIC_RAPIDAPIHOST || process.env.RAPIDAPIHOST,
					},
				}
			)
			if (!response.ok)
				throw new Error(response.status + " - " + response.statusText)
			const data = await response.json()
			const { results, total_pages } = data
			setMaxPages(total_pages)
			setResults((prev) => {
				return [...prev, ...results]
			})
			setPage((prev) => prev + 1)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setError(error.toString())
			console.error(error)
		}
	}

	function getGenres(codes) {
		let genres = codes
			.map((code) => {
				return genresCodes[code]
			})
			.join(", ")
		return genres
	}

	function handleFormData() {
		setInitial(false)
		setPage(1)
		setResults([])
		getStreamingData()
		setDrawer(false)
		const results = document.getElementById("results")
		setTimeout(() => {
			results.scrollIntoView(true)
		}, 400)
	}
	async function addToWatchlist(e, data) {
		e.preventDefault()
		try {
			const response = await fetch(
				`https://node-what-to-watch.herokuapp.com/api/watchlist`,
				{
					method: "POST",
					body: JSON.stringify({
						imageUrl: data.backdropURLs[1280],
						title: data.title,
						year: data.year,
						rating: data.imdbRating.toString().split("").join("."),
						streamingInfo: data.streamingInfo,
						director: data.significants.join(", "),
						cast: data.cast.join(", "),
						overview: data.overview,
						runtime: data.runtime + " min",
						age: data.age,
						genres: getGenres(data.genres),
						link: data.video,
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
				}
			)
			setUpdate("Added to Watchlist.")
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="home">
			<Header />
			<Hero
				handleFormData={handleFormData}
				setGenre={setGenre}
				setStreamingService={setStreamingService}
				setMovieOrSeries={setMovieOrSeries}
				genre={genre}
				streamingService={streamingService}
				movieOrSeries={movieOrSeries}
				opened={drawer}
				close={() => setDrawer(false)}
				openDrawer={() => setDrawer(true)}
			/>
			{update && (
				<Notification text={update} onClick={() => setUpdate(false)} />
			)}
			{error && (
				<Notification text={error.toString()} onClick={() => setError(false)} />
			)}
			{results.length === 0 && !initial && !loading && (
				<Notification
					text={"No items, please modify your search."}
					onClick={() => setInitial(true)}
				/> //TODO FIX
			)}
			<ModifySearch onClick={() => setDrawer(true)} />
			<Scroll />
			<div id="results">
				{results.length > 0 && <h1>Search Results</h1>}
				{results.length > 0 && (
					<CardGrid>
						{results
							// .sort((a, d) => d.imdbRating - a.imdbRating)
							.map((x, i) => (
								<Card
									key={x.tmdbID + i}
									ref={i === results.length - 1 ? lastItem : null}
									src={
										x.backdropURLs["1280"]
											? x.backdropURLs["1280"]
											: "images/na.png"
									}
									title={x.title}
									year={x.year}
									rating={x.imdbRating.toString().split("").join(".")}
									streamingInfo={x.streamingInfo}
									director={x.significants.join(", ")}
									cast={x.cast.join(", ")}
									overview={x.overview}
									runtime={x.runtime && x.runtime + " min"}
									age={x.age === -1 || !x.age ? null : `${x.age}+`}
									genres={getGenres(x.genres)}
									link={x.video}
									onAddWatchlist={(e) => {
										addToWatchlist(e, x)
									}}
								/>
							))}
					</CardGrid>
				)}
				{!error && loading && (
					<Middler>
						<Spinner />
					</Middler>
				)}
			</div>
		</div>
	)
}
