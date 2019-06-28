
import { Button } from '@wordpress/components';
import { soundcheckUrl } from '../environment';

const CreateListingButton = () => {
    let domain = window.location.hostname;
    let url = window.location.protocol + "//" + domain;
    let token = localStorage.getItem('jwt');
    let createListing = () => {
        const destination = `${soundcheckUrl}/app/start/wordpress?url=${encodeURIComponent(url)}&token=${token}`;
        window.location.href = destination;
    };
    return (
        <Button isPrimary onClick={createListing}>Create Listing for {domain}</Button>
    )
}

export default CreateListingButton;