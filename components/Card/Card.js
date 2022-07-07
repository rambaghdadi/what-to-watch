import classes from "./Card.module.css"
import React, { useEffect } from "react"
import { useState } from "react"
import { Minus, Plus } from "tabler-icons-react"
import { useRouter } from "next/router"

const streamingServices = {
	netflix: {
		icon: "netflixLogo.svg",
	},
	disney: {
		icon: "disneyLogoLight.svg",
	},
	prime: {
		icon: "primeLogo.svg",
	},
	britbox: {
		icon: "britboxLogo.svg",
	},
	iplayer: {
		icon: "iplayerLogo.svg",
	},
	now: {
		icon: "nowLogo.svg",
	},
	apple: {
		icon: "appleLogo.png",
	},
	all4: {
		icon: "all4Logo.svg",
	},
}

const Card = React.forwardRef((props, ref) => {
	const router = useRouter()
	const [user, setUser] = useState(null)
	const [expandDetails, setExpandDetails] = useState(false)

	const streamingInfo = props.streamingInfo
	const streamingInfoArray = Object.keys(streamingInfo)

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) setUser(token)
	}, [])

	return (
		<div ref={ref} className={classes.card}>
			<img src={props.src} alt="movie poster" width={"100%"} />
			<div className={classes.info}>
				<div className={classes.mainInfo}>
					<div className={classes.first}>
						<p className={classes.title}>{props.title}</p>
						<p className={classes.year}>{props.year}</p>
					</div>
					<div className={classes.second}>
						<div className={classes.rating}>
							<img
								className={classes.starRating}
								src="/images/star.svg"
								alt="star"
							/>
							<p className={classes.numberRating}>{props.rating}</p>
						</div>
						<img
							className={classes.imdbImage}
							src="/images/imdbLogo.png"
							alt="imdb logo"
						/>
					</div>
				</div>
				<div className={classes.secondaryInfo}>
					<p>{props.genres}</p>
					<p
						onClick={() => setExpandDetails(!expandDetails)}
						className={classes.moreDetails}
					>
						{expandDetails ? "Less" : "More"} Details
					</p>
				</div>
				{expandDetails && (
					<div className={classes.expandedDetails}>
						<p>
							<b>Director(s):</b> {props.director}
						</p>
						<p>
							<b>Cast:</b> {props.cast}
						</p>
						<p>
							<b>Overview:</b> {props.overview}
						</p>
						<div style={{ display: "flex", gap: "1rem" }}>
							<p className={props.age ? classes.age : null}>{props.age}</p>
							<p className={props.runtime ? classes.runtime : null}>
								{props.runtime}
							</p>
						</div>
						<iframe
							className={classes.iframe}
							src={`https://www.youtube.com/embed/${props.link}`}
						></iframe>
					</div>
				)}
				<div className={classes.thirdSection}>
					<div className={classes.streamingInfo}>
						{streamingInfoArray.map((service, i) => {
							return (
								<div key={service + i} className={classes.streamingInfoItem}>
									<img
										src={
											streamingServices[service]
												? `images/${streamingServices[service].icon}`
												: null
										}
										alt={`${service} logo`}
									/>
								</div>
							)
						})}
					</div>
					{user ? (
						<div>
							<button
								onClick={props.onAddWatchlist}
								className={classes.addToWatchListBtn}
							>
								<span className={classes.btn}>
									{router.asPath === "/" ? (
										<Plus size={15} strokeWidth={2} color={"black"} />
									) : (
										<Minus size={15} strokeWidth={2} color={"black"} />
									)}

									<span>{router.asPath === "/" ? "Watchlist" : "Remove"}</span>
								</span>
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
})
Card.displayName = "Card"
export default Card

//TODO if in watchlist already, remove
