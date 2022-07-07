import { useEffect, useState } from "react"
import { ChevronUp } from "tabler-icons-react"

export default function Scroll(props) {
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

	function scrollUp() {
		window.scrollTo(0, 0)
	}

	return (
		visible && (
			<div onClick={scrollUp} style={styles}>
				<ChevronUp color="white"></ChevronUp>
			</div>
		)
	)
}

const styles = {
	backgroundColor: "black",
	borderRadius: "50%",
	width: "40px",
	height: "40px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "fixed",
	bottom: 20,
	right: 20,
	cursor: "pointer",
}
