import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

  renderOrder = key => {
    const fish = this.props.fishes[ key ];
    const count = this.props.order[ key ];

    const transitionOptions = {
      classNames : 'order',
      key,
      timeout : { enter : 500, exit : 500 }
    };

    if( !fish || fish.status === 'unavailable' ) {
      return (
        <CSSTransition { ...transitionOptions }>
          <li key={ key }>
            Sorry, { fish ? fish.name : 'fish' } is no longer available
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition { ...transitionOptions }key={ key }>
        <li key={ key }>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={ count } timeout={ { enter : 500, exit : 500 } } >
                <span>{ count }</span>
              </CSSTransition>
            </TransitionGroup>
          </span>
          lbs { fish.name } { formatPrice( fish.price * count ) }
          <button onClick={ () => this.props.removeFromOrder( key ) } >&times;</button>
        </li>
      </CSSTransition>
    )
  } 

  render() {

    const orderIds = Object.keys( this.props.order );
    const total = orderIds.reduce( (prevTotal, key ) => {

      const fish = this.props.fishes[ key ];
      const count = this.props.order[ key ];
      const isAvailable = fish && fish.status === 'available';

      if( isAvailable ) {
        return prevTotal + (fish.price * count || 0);
      }

    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup  
          className="order"
          component="ul"
        >
          { orderIds.map( this.renderOrder ) }
          <li className="total" >
            <strong>Total : </strong>
            { formatPrice( total ) }
          </li>
        </TransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  fishes : PropTypes.object.isRequired,
  order : PropTypes.object.isRequired,
  removeFromOrder : PropTypes.func.isRequired
};

export default Order;