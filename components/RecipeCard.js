import Image from "next/image"
import Link from "next/link"
import styles from "../styles/RecipeCard.module.css"

export default function RecipeCard({ recipe }) {

    const {recipeName, cookTime, ingredients, slug } = recipe.fields
    const tag = recipe.metadata.tags[0].sys.id;

    return(
        <div className={styles.card}>
            <h3 className={styles.title}>{recipeName}</h3>
            <div className={styles.thumbnail}>
                <Image 
                    className={styles.image}
                    src={"https:" + recipe.fields.photo.fields.file.url}
                    width={recipe.fields.photo.fields.file.details.image.width}
                    height={recipe.fields.photo.fields.file.details.image.height}
                    objectFit={'cover'}
                    alt={'thumbnail image'}
                    
                />
            </div>
            <div className={styles.content}>
                <p><span className={styles.bold}>Cook Time:</span> { cookTime}</p>
                <p><span className={styles.bold}>Tags:</span> {tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
            </div>
            <div className={styles.button}>
                <Link href={'/recipes/' + slug}> More Details</Link>
            </div>
        </div>
    )
}