import SharedHero from "../../sections/contact/SharedHero"
import PropertiesSection from "../../sections/properties/PropertiesSection"


const PropertiesPage = () => {
  return (
    <>
    <SharedHero
  smallTitle="Properties"
  title="Find your next home"
  desc="Browse properties by city, price and type"
  showFilter={true}
  onFilterChange={(filters) => console.log("filters:", filters)}
/>
<PropertiesSection />
    </>
  )
}

export default PropertiesPage
