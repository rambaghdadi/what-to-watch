import classes from "./Form.module.css"
import {
	SegmentedControl,
	Select,
	Chip,
	Chips,
	Button,
	Drawer,
} from "@mantine/core"
import genresCodes from "../../lib/Genres"
import { useState } from "react"

export default function Form(props) {
	function getGenres() {
		let genres = []
		for (let i in genresCodes) {
			genres.push({ value: i, label: genresCodes[i] })
		}
		return genres
	}

	return (
		<div className={classes.main}>
			<form className={classes.form}>
				<SegmentedControl
					value={props.movieOrSeries}
					onChange={props.setMovieOrSeries}
					fullWidth
					color={"blue"}
					data={[
						{ label: "Movies", value: "movie" },
						{ label: "Series", value: "series" },
					]}
				/>

				<Chips
					className={classes.chips}
					multiple={false}
					value={props.streamingService}
					onChange={props.setStreamingService}
					variant={"filled"}
					spacing={"md"}
					color="blue"
					size="sm"
					radius={"md"}
				>
					<Chip value="netflix">Netflix</Chip>
					<Chip value="prime">Prime</Chip>
					<Chip value="disney">Disney+</Chip>
					<Chip value="apple">Apple TV</Chip>
					<Chip value="now">Now TV</Chip>
					<Chip value="all4">All 4</Chip>
					<Chip value="iplayer">BBC iPlayer</Chip>
					<Chip value="britbox">BritBox</Chip>
				</Chips>
				<Select
					className={classes.genreSelect}
					variant="filled"
					searchable
					required
					value={props.genre}
					onChange={props.setGenre}
					// label="Genre"
					placeholder="Pick one"
					data={getGenres()}
				/>

				<Button onClick={props.handleFormData}>Search</Button>
			</form>
		</div>
	)
}
