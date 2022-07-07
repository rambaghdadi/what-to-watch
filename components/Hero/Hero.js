import { Button, Drawer, Modal } from "@mantine/core"
import Form from "../Form/Form"
import classes from "./Hero.module.css"

export default function Hero(props) {
	return (
		<div className={classes.main}>
			<div className={classes.text}>
				<h1>Discover the latest and the greatest movies and shows.</h1>
				<p>
					Choose your favorite streaming provider and never miss when your
					favourite movies or tv series are added.
				</p>
				<Button onClick={props.openDrawer} size="md">
					Discover Now
				</Button>
				<Drawer
					opened={props.opened}
					onClose={() => props.close()}
					padding="lg"
					size="xl"
				>
					<Form {...props} />
				</Drawer>
			</div>
		</div>
	)
}
