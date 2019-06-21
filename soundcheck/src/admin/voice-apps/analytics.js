import { Spinner, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose, withState } from '@wordpress/compose';
import Table from '../components/table';

import './command.scss';

const Analytics = compose(
    [
        withState({
            now: Date.now()
        }), 
        withSelect(

            (select, ownProps) => {

                const { app, now } = ownProps;
                const { getVoiceAppStats } = select('soundcheck');
                let appStats = getVoiceAppStats(app.id, 0, now);
                const formattedData = app ? compileStats(appStats).map(d => {
                    return [{ value: d.platform }, { value: d.requests }, { value: d.users }]
                }) : undefined;
                return {
                    stats: formattedData
                }
            }

        )
    ])(

        ({ stats }) => {
            if (stats) {

                return (
                        <Table data={stats} headers={['platform', 'requests', 'users']} />
                )
            } else { return (<Spinner />) }
        }
    )

const ELEMENT_DATA = [
    { platform: 'Alexa', requests: 0, users: 0 },
    { platform: 'Actions on Google', requests: 0, users: 0 },
    { platform: 'Soundcheck Mobile', requests: 0, users: 0 },
];

const compileStats = (stats) => {
    let uniques = new Set();
    let data = [
        Object.assign({}, ELEMENT_DATA[0]), 
        Object.assign({}, ELEMENT_DATA[1]), 
        Object.assign({}, ELEMENT_DATA[2])
    ];
    if (stats) {
        for (let event of stats) {
            let index = -1;
            if (event.platform == 'alexa') {
                index = 0;
            } else if (event.platform == 'aog') {
                index = 1;
            } else if (event.platform == 'mobile') {
                index = 2;
            }
            if (index >= 0) {
                data[index].requests++;
                if (!uniques.has(event.userId)) {
                    data[index].users++;
                    uniques.add(event.userId);
                }
            }
        }
    }
    return data;
}

export default Analytics;
