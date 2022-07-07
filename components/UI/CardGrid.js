import classes from "./CardGrid.module.css"

export default function CardGrid(props) {
	return <div className={classes.main}>{props.children}</div>
}
