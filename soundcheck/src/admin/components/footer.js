
import { PanelRow, Button, ExternalLink } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';

import './footer.scss';

const Footer = withDispatch((dispatch, ownProps) => {
    const { setUser } = dispatch('soundcheck');
    return {
        signOut:()=>{
            setUser(null);
            localStorage.removeItem("jwt");
        }
    }})
    (({ signOut }) => {
    return (
        <PanelRow>
            <div className="soundcheck-dashboard-footer">
                <div className="soundcheck-dashboard-footer__item">
                    <Button isLink onClick={signOut}>Sign Out</Button>
                </div>
                <div className="soundcheck-dashboard-footer__item">
                    <ExternalLink href="https://soundcheck.ai">soundcheck.ai</ExternalLink>
                </div>
                <div className="soundcheck-dashboard-footer__item">
                    <ExternalLink href="mailto:help@soundcheck.ai">Help</ExternalLink>
                </div>
            </div>
        </PanelRow>
    )
})

export default Footer;