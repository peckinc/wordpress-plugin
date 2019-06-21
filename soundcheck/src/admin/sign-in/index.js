import { Component, Fragment } from '@wordpress/element';
import { withDispatch } from '@wordpress/data';
import { Panel, PanelBody, PanelRow, TextControl, Button, Notice, ExternalLink } from '@wordpress/components';
import { compose, withState } from '@wordpress/compose';
import soundcheckApiFetch from '../api/soundcheck-api-fetch';
import { soundcheckApiUrl } from '../environment';
import './style.scss';
import soundcheck from '../images/soundcheck.png';

const SignIn = compose([withDispatch((dispatch, ownProps) => {
    const { setUser } = dispatch('soundcheck');
    return {
        onToken: (token) => {
            localStorage.setItem("jwt", token);
            soundcheckApiFetch({ path: "/v4/user" }).then(u => {
                console.log("got user", u);
                setUser(u);
            });
        }
    }
}),
withState({
    email: undefined,
    codeSent: false
})])(({ codeSent, email, className, setState, onToken }) => {
    return (
        <Panel header="Already Have an Account?" className={className ? className : ''}>
            <PanelBody>

                <PanelRow>
                    <div className="sign-in">

                        <div className="sign-in__form">
                            <div class="logo"><img height="48" src={soundcheck} /></div>
                            <h3>Sign In</h3>
                            {codeSent ?
                                <CodeForm email={email}
                                    onGoBack={() => { setState({ codeSent: false }) }}
                                    onTokenReceived={onToken} /> :
                                <EmailForm
                                    onCodeSent={(email) => { setState({ codeSent: true, email: email }) }} />}

                        </div>
                    </div>
                </PanelRow>
            </PanelBody>
        </Panel>
    );


});

const EmailForm = withState(
    {
        email: "",
        error: null
    }
)(({ onCodeSent, email, setState, error }) => {
    return (
        <Fragment>
            {error && <div className="sign-in__notice">
                <Notice status="error" onRemove={() => { setState({ error: null }) }}>
                    {error}
                </Notice>
            </div>}
            <TextControl
                label="Your Email Address"
                type="email"
                value={email}
                onChange={(e) => setState({ email: e })}
            />
            <Button className="sign-in__button" isPrimary onClick={() => {
                if (email) {

                    return fetch(`${soundcheckApiUrl}/auth/email`,
                        {
                            method: "POST",
                            mode: "cors",
                            credentials: "omit",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ email: email, create: false })
                        }
                    ).then(r => {
                        if (r.status == 200) {
                            onCodeSent(email);
                        } else if (r.status == 500) {
                            setState({ error: "There was an error sending your login code." })
                        } else {
                            r.json().then(j => {
                                setState({ error: j.message })
                            });

                        }
                    }

                    ).catch(e => setState({ error: e }))


                }

            }}>Send Sign In Code</Button>
        </Fragment>
    )
}
)
const CodeForm = withState(
    {
        authCode: "000000",
        error: null
    }
)(({ authCode, onGoBack, onTokenReceived, error, email, setState }) => {
    return (
        <Fragment>
            {error && <div className="sign-in__notice">
                <Notice status="error" onRemove={() => { setState({ error: null }) }}>
                    {error}
                </Notice>
            </div>}
            <TextControl
                label="Your Login Code"
                type="text"
                onChange={(code) => { setState({ authCode: code }) }}
            />
            <Button className="sign-in__button" isPrimary onClick={() => {
                return fetch(
                    `${soundcheckApiUrl}/auth/email?email=${encodeURIComponent(email)}&code=${authCode}`,
                    {
                        method: "GET",
                        mode: "cors",
                        credentials: "omit",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }).then(r => {
                        if (r.status == 200) {
                            return r.json();
                        } else {
                            throw new Error("Invalid login token");
                        }
                    })
                    .then(r => {
                        console.log("response", r);

                        onTokenReceived(r.token);

                    }
                    ).catch(e => {
                        console.log(e);
                        setState({ error: e.message });
                    })

            }}>Confirm Code</Button>
            <p>Didn't receive your code?</p>
            <Button isLink onClick={onGoBack}>Try Again</Button>
        </Fragment>
    )
}
)
export default SignIn;