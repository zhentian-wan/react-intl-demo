import React from 'react';
import { injectIntl, FormattedMessage, FormattedHTMLMessage, FormattedRelative , FormattedTime, FormattedNumber } from 'react-intl';
import {meanBy, round, sortBy} from 'lodash';

import books from '../books.json';

const BookDetail = ({match, intl}) => {
  const book = books.find(book => book.id === parseInt(match.params.bookId, 10));
  const sortedReviews = sortBy(book.reviews, 'date').reverse();
  const avgRating = book.reviews.length ? round(meanBy(book.reviews, (r) => r.rating), 2): 0;

  return (
    <div className="BookDetail">
      <div className="BookDetail-meta">
        <img src={book.image} width="200" height="275" alt={book.title}/>
        <div className="BookDetail-metaBody">
          <h1>{book.title}</h1>
          <h3>
            <FormattedMessage id="detail.author" values={{
              author: book.author
            }} />
          </h3>
          <div>
            <input type="checkbox" id="toggle" hidden/>
            <p>{book.description}</p>
            <label className="BookDetail-descriptionToggle" htmlFor="toggle">
              <FormattedMessage id="detail.toggle"/>
            </label>
          </div>
        </div>
      </div>

      <h3 className="BookDetail-merchantHeading">Purchase this book from:</h3>
      <div className="BookDetail-merchants">
        {book.merchants.map((merchant) => (
          <a href={merchant.link} target="_blank" className="Merchant" key={merchant.name}>
            <img src={merchant.icon} width="32" height="32" alt={merchant.name}/>
            <strong>{merchant.name}</strong>
            <p>
              <FormattedNumber 
                style='currency'
                currency={intl.locale === 'en-US' ? 'USD': 'EUR'}
                currencyDisplay='symbol'
                value={merchant.price[intl.locale]} />
            </p>
          </a>
        ))}
      </div>

      <FormattedHTMLMessage id="detail.window" values={{numMerchants: book.merchants.length}} />

      <h2>Reviews</h2>
      <h3>
        <FormattedMessage id="detail.averageRating" values={{
          avg: avgRating,
          count: book.reviews.length
        }} />
      </h3>
      <div className="BookDetail-reviews">
        {sortedReviews.map((review) => (
          <div className="Review" key={review.date}>
            <div className="Review-meta">
              <img src={review.avatar} alt="Avatar"/>
              <p>
                <FormattedMessage id="detail.userRating" values={{
                  name: <strong>{review.name}</strong>,
                  rating: review.rating
                }}/><br />
                {
                  /**
                  
                    <FormattedDate value={new Date(review.date)}
                      year='2-digit'
                      month='2-digit'
                      day='2-digit' />
                   */
                }
                <FormattedTime 
                  year='2-digit'
                  month='2-digit'
                  day='2-digit'
                  value={new Date(review.date)} />
                <br />
                <FormattedRelative 
                  value={new Date(review.date)}
                  style="numeric"
                  />
              </p>
            </div>
            <p>{review.body}</p>
          </div>
        ))}
      </div>

      <textarea placeholder={intl.formatMessage({
        id: 'detail.inputPlaceholder'
      })} cols="30" rows="10"></textarea>
    </div>
  )
}

export default injectIntl(BookDetail);
