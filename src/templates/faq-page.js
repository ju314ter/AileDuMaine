import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import '../sass/faq.sass'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FaqPageTemplate = ({
    questions
}) => {

    useEffect(()=>{
        console.log(questions)
    })

    return (
        <div className="faq-wrapper">
            {questions && questions.map((question,i)=>(
                <Accordion key={i} className="accordion">
                    <AccordionSummary className="accordion-question" expandIcon={<ExpandMoreIcon />}>
                        <h2 style={{color:"black"}}>{question.intitule}</h2>
                    </AccordionSummary>
                    <AccordionDetails className="accordion-reponse">
                        <div 
                            data-sal="slide-up"
                            data-sal-duration="1000"
                            data-sal-easing="ease">
                            {question.reponse}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

FaqPageTemplate.propTypes = {
}

const FaqPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <FaqPageTemplate questions={frontmatter.questions}
            />
        </Layout>
    )
}

FaqPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default FaqPage

export const pageQuery = graphql`
  query FaqPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "faq-page" } }) {
      frontmatter {
        title
        questions {
            intitule
            reponse
        }
      }
    }
  }
`
