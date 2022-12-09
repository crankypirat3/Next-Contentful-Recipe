import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../../styles/RecipeDetails.module.css';
import Image from 'next/image';




// Connects to my contentful Space
const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
    // Gets all Entires under Recipe from Contentful 

    const res = await client.getEntries({
        content_type: 'recipe'
    })

    // Loops Through each object and returns Path array with Objects with params: slug
    const paths = res.items.map(item => {
        return {
            params: {slug: item.fields.slug}
        }
    })
    // getStaticProps Returns paths array
    return{
        paths: paths,
        fallback: false,
    }
}

// Made when Builing to render the correct page
export async function getStaticProps({ params }) {
    const {items} = await client.getEntries({
        content_type: "recipe", 
        "fields.slug": params.slug
    })
    return{
        props: {recipe: items[0]}
    }
}


export default function RecipeDetails({recipe}) {
    const tag = recipe.metadata.tags[0].sys.id;
    // console.log(recipe)
    return (
      
        <div className={styles.contentContainer}>
            <h1 className={styles.head}> 
                This is the {recipe.fields.recipeName} page 
            </h1>
            <div className={styles.content}>
                <div className={styles.description}>
                    {documentToReactComponents(recipe.fields.description)}
                </div>
                <hr className={styles.hr} />
                <div className={styles.detailBody}>
                    <div className={styles.ingredients}>
                        <h3 className={styles.ingredientHead}>Ingredients:</h3>
                        <ul className={styles.ingredientList}>
                            {
                                recipe.fields.ingredients.map( ingredient =>
                                    <li key={ingredient.index}> {ingredient} </li>
                                    )
                            }
                        </ul>
                    </div>
                    <div className={styles.detailImage}>
                        <Image className={styles.image} src={"https:" + recipe.fields.photo.fields.file.url}
                            alt="picture of dish"
                            width={recipe.fields.photo.fields.file.details.image.width}
                            height={recipe.fields.photo.fields.file.details.image.height}
                            objectFit={'contain'}
                        />
                    </div>
                </div>
                
                <p> Tags: { tag.charAt(0).toUpperCase() + tag.slice(1) }</p>
            </div>
        </div> 
        
     );
}
 
