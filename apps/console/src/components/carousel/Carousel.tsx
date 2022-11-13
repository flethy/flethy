import {
	Box,
	Center,
	IconButton,
	Image,
	useBreakpointValue,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'

// Settings for the slider
const settings = {
	dots: true,
	arrows: false,
	fade: true,
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
}

export interface ImageSource {
	src: string
	alt: string
	id: string
}

export default observer((props: { images: ImageSource[] }) => {
	const [slider, setSlider] = React.useState<Slider | null>(null)

	// These are the breakpoints which changes the position of the
	// buttons as the screen size changes
	const top = useBreakpointValue({ base: '90%', md: '50%' })
	const side = useBreakpointValue({ base: '30%', md: '10px' })

	return (
		<Center>
			<Box
				position={'relative'}
				overflow={'hidden'}
				// w={{ base: '350px', sm: '100%' }}
			>
				{/* CSS files for react-slick */}
				<link
					rel="stylesheet"
					type="text/css"
					charSet="UTF-8"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
				/>
				{/* Left Icon */}
				<IconButton
					aria-label="left-arrow"
					variant="ghost"
					position="absolute"
					left={side}
					top={top}
					transform={'translate(0%, -50%)'}
					zIndex={2}
					onClick={() => slider?.slickPrev()}
				>
					<BiLeftArrowAlt />
				</IconButton>
				{/* Right Icon */}
				<IconButton
					aria-label="right-arrow"
					variant="ghost"
					position="absolute"
					right={side}
					top={top}
					transform={'translate(0%, -50%)'}
					zIndex={2}
					onClick={() => slider?.slickNext()}
				>
					<BiRightArrowAlt />
				</IconButton>
				{/* Slider */}
				<Slider {...settings} ref={(slider) => setSlider(slider)}>
					{props.images.map((image) => (
						<Image src={image.src} alt={image.alt} key={image.id} />
					))}
				</Slider>
			</Box>
		</Center>
	)
})
