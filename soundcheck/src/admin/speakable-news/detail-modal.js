import { Icon, Modal } from '@wordpress/components';

const ArticleDetailModal = ({ article, onRequestClose }) => {
    return (
        <Modal
            title="Article Detail"
            onRequestClose={onRequestClose}>
            {article.speakableValidation && article.speakableValidation.metadata && article.speakableValidation.metadata.title ?
                <h2>{article.speakableValidation.metadata.title}</h2>
                : <h2>Title Not Found</h2>
            }
            {article.speakableValidation && article.speakableValidation.metadata && article.speakableValidation.metadata.image ?

                <img src={article.speakableValidation.metadata.image} alt={article.speakableValidation.metadata.title} width="100%" />
                : null
            }
            {article.speakableValidation && article.speakableValidation.metadata && article.speakableValidation.metadata.description ?

                <p><strong>Description:</strong> {article.speakableValidation.metadata.description}</p>
                : <p><strong>Description:</strong> metadata missing.</p>
            }
            {article.speakableValidation && article.speakableValidation.linkeddata && article.speakableValidation.linkeddata.length ?

                <p><strong>Structured Data:</strong> Found JSON+LD structured data.</p>
                : <p><strong>Structured Data:</strong> JSON+LD structured data missing.</p>
            }
            {article.speakableValidation && article.speakable ?

                <p><strong>Speakable:</strong> {article.speakableValidation.speakable}</p>
                : <p><strong>Speakable:</strong> No speakable content found.</p>
            }
            {article.newsPresence && article.newsPresence.firstSeenOn ?

                <p><strong>Google News:</strong> {(new Date(article.newsPresence.firstSeenOn)).toLocaleDateString()}</p>
                : <p><strong>Google News:</strong> Not seen in Google News.</p>
            }
        </Modal>
    )
}

export default ArticleDetailModal