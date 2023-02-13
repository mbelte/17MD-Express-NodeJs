import TextContent from "../../components/TextContent/TextContent";

const text = 'This is an Home page example\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Error ducimus a dicta doloribus corrupti, vitae adipisci vel quasi officiis perspiciatis, iure mollitia laborum temporibus recusandae distinctio iste? Non, dicta illo.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolorum aut, eius soluta mollitia aliquam, nostrum magnam nemo blanditiis cum corrupti odit quis tempore, architecto nesciunt aliquid animi commodi dolores! Lorem ipsum dolor sit amet consectetur adipisicing elit.\nAnimi qui exercitationem beatae praesentium, excepturi corrupti accusamus cumque. Deleniti quam nesciunt, laboriosam nulla, minus, laborum veritatis illum ipsa tempora non inventore?'

const HomePage = () => {
  return (
    <TextContent heading='Home page'>
      { text }
    </TextContent>
  )
};

export default HomePage;
