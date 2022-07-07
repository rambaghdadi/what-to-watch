import { useEffect, useState } from "react"

export default function ModifySearch(props) {
	const [offset, setOffset] = useState(0)
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset)
		if (offset > 600) {
			setVisible(true)
		}

		if (offset < 600) {
			setVisible(false)
		}
		// clean up code
		window.removeEventListener("scroll", onScroll)
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [offset])

	return (
		visible && (
			<div onClick={props.onClick} style={styles}>
				<p style={{ fontSize: "1.4rem", fontWeight: "500" }}>Modify Search</p>
			</div>
		)
	)
}

const styles = {
	backgroundColor: "#228be6",
	padding: "1rem 2rem",
	borderRadius: "150px 150px 150px 150px",
	// width: "100px",
	// height: "40px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "fixed",
	bottom: 70,
	right: 20,
	cursor: "pointer",
}
