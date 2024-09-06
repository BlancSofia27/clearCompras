import React, { useEffect, useState } from "react"
import header from "../assets/headerCompras.png"
import { useAuth0 } from "@auth0/auth0-react"

type HeroProps = {}

const Hero = React.forwardRef<HTMLElement, HeroProps>((props, ref) => {
  const { isAuthenticated, user } = useAuth0()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const checkUserExists = async () => {
      if (isAuthenticated && user?.sub) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/${user.sub}`
          )
          if (!response.ok) {
            // User does not exist
            setShowButton(true)
          }
        } catch (error) {
          console.error("Error checking user existence:", error)
        }
      }
    }

    checkUserExists()
  }, [isAuthenticated, user])

  return (
    <section ref={ref}>
      <div className="relative w-full xl:h-96 xs:h-[100px]">
        <img
          src={header}
          alt="Hero Background"
          className=" absolute inset-0 w-full h-full object-cover animate-fadeIn"
        />
        {showButton && (
          <a
            href="https://wa.me/+5491166941550?text=Hola%2C%20me%20gustaría%20dar%20de%20alta%20mi%20negocio."
            className="ml-4 flex text-center justify-center w-60 mx-2 rounded bg-orange-500 text-white px-6 py-2.5 text-xs font-medium uppercase leading-normal focus:outline-none transition duration-1000 ease-in-out transform hover:bg-white hover:text-[#128c7e]"
          >
            Dar de Alta mi negocio
          </a>
        )}
      </div>
    </section>
  )
})

Hero.displayName = "Hero"
export default Hero
