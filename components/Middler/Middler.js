import classes from "./Middler.module.css"

export default function Middler(props) {
	return <div className={classes.main}>{props.children}</div>
}
