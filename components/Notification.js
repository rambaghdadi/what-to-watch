import { Button } from "@mantine/core"
import classes from "./Notification.module.css"

export default function Notification(props) {
	return (
		<div className={classes.main}>
			<div className={classes.primary}>
				<p>Alert</p>
			</div>
			<div className={classes.secondary}>
				<p>{props.text}</p>
				<Button size="xs" onClick={props.onClick} color={"red"} variant="light">
					Close
				</Button>
			</div>
		</div>
	)
}
