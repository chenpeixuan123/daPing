import React, {Component} from 'react'





export default class Branchcs extends Component {
    constructor(props) {
        super(props);
        window.share.resetPageSize(1916, 1076);
       alert(1)
    }

    componentWillUnmount() {
        alert(2);
    }

    componentDidMount() {
        alert(3);
    }

    render() {
        alert(4);
        return (
            <div>
                sdfs
            </div>
        )
    }
}
