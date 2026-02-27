import SharedHero from "../../sections/contact/SharedHero"


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
    </>
  )
}

export default PropertiesPage
