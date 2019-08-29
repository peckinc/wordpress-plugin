
import icons from '../../icons';
import { Spinner } from '@wordpress/components';
const SpeakableIcon = ({ isLoading, isValid, tooltip, color }) => {
    if (isLoading) {
        return <Spinner />;
    } else if (isValid) {
        return icons.speakable(tooltip, color);
    } else {
        return <span className="dashicons dashicons-minus"></span>
    }
}


export default SpeakableIcon;