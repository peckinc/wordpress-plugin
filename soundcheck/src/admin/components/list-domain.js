import { Panel, PanelBody, Button, Notice } from '@wordpress/components';
import Footer from '../components/footer';
import CreateListingButton from '../create-listing-button';


const ListDomainPanel = ({domain}) => {

    return (
        <Panel header="Soundcheck Voice Hosting">
            <PanelBody>
                <Notice status="warning" isDismissible={false}>
                    This domain {domain} is not listed with Soundcheck.
                    </Notice>

                <p>You can list your domain for free and start making your business ready for voice.</p>
                <p>
                <CreateListingButton/>
                </p>
                <Footer/>
            </PanelBody>
        </Panel>

    )
}

export default ListDomainPanel;