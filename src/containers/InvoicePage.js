import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsPDF from 'jspdf'
import { myApi } from '../helpers'
import { Heading3, SubHeading1, Paragraph } from '../styles/typography'
import {Section, Container, Invoice, Logo, Address, ProductName, ProductQty, ProductTotal, Footer, FooterTotal} from '../styles/layout'

const InvoicePage = props => {

  const {
    match: {
      params: { _id },
    },
  } = props;

  const history = useHistory()
  const [ order, setOrder ] = useState(undefined)

  useEffect(() => {
    apiCall()
  }, [])

  const apiCall = async () => {
    const order = await myApi.send(`/orders/${_id}`, 'GET', undefined, 'public')
    setOrder(order)
  }

  useEffect(() => {
    console.log("ORDER: ", order)
  }, [order])

  const generateInvoice = () => {
    const doc = new jsPDF('p', 'pt', 'a4')
    doc.html(document.querySelector('#content'),
    {
        callback: function(pdf){
            let pageCount = doc.internal.getNumberOfPages()
            pdf.deletePage(pageCount)
            pdf.save(`${_id}.pdf`)
        }
    })
  }

  const renderInvoice = () => {
    const {
      order_items,
      order_total,
      order_carrier: {
        shipping_carrier,
      },
      order_customer: {
        customer_address1,
        customer_address2,
        customer_firstname,
        customer_lastname,
        customer_town,
        customer_postcode
      }
      } = order
    return (
        <Invoice id='invoice'>
          <Logo>
            <Heading3>
              <img src="/logo.jpg" style={{width: '130px'}}/><br/>
               RECEIPT
            </Heading3>
          </Logo>
          <Address >
              <Paragraph sml>
                {customer_firstname} {customer_lastname}
              </Paragraph>
              <Paragraph sml>
              {customer_address1}
              </Paragraph>
              <Paragraph sml>
              {customer_address2}
              </Paragraph>
              <Paragraph sml>
              {customer_town}
              </Paragraph>
              <Paragraph sml>
              {customer_postcode}
              </Paragraph>
          </Address>
          <ProductName>
            <Paragraph sml heavy>
              Item
            </Paragraph>

          {order_items && order_items.products.map((item, i) => (
            <p key={i}>
              <Paragraph sml>
                {item.product_name}
              </Paragraph>
            </p>
          )) }
          <Paragraph sml>
            Postage: {shipping_carrier}
          </Paragraph>
            </ProductName>
          <ProductQty>
            <Paragraph sml heavy>
              Quantity
            </Paragraph>
            {order_items && order_items.products.map((item, i) => (
                <Paragraph sml key={i}>
                  {item.product_qty}
                </Paragraph>
            )) }
          </ProductQty>
          <ProductTotal>
            <Paragraph sml heavy>
            Price
            </Paragraph>
            {order_items && order_items.products.map((item, i) => (
              <Paragraph sml key={i}>
                &pound; {item.total_price.toFixed(2)}
              </Paragraph>
            )) }
            <Paragraph sml>
              &pound; {order_items.postage.toFixed(2)}
            </Paragraph>
          </ProductTotal>
          <Footer>
            <Paragraph>Total</Paragraph>
          </Footer>
          <FooterTotal>
            <Paragraph heavy>
              &pound; {order_total}
            </Paragraph>
          </FooterTotal>
        </Invoice>
    )
  }

    return (
        <div>
        <Container>
          <Section light>
          <button style={{marginBottom: '30px'}} onClick={() => history.push('/admin')}>Back</button>
          <button style={{marginBottom: '30px'}} onClick={() => generateInvoice()}>Download Invoice</button>
            <div id="content" style={{height: '838px', width: '591px', padding: '4px'}}>
                { order && renderInvoice() }
            </div>
          </Section>
        </Container>
        </div>
    )
}

export default InvoicePage