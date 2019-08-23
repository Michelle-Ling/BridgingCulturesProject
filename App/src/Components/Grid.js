import React from 'react';
import Single from './Single';

class Grid extends React.Component {
    renderItems() {
        return this.props.notes.map(item =>
            <Single 
                key={item.id}
                notes={item}
            />

            );
    }

    render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}

export default Grid;