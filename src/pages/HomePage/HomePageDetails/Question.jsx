import { Box, Typography } from '@mui/material'
import React from 'react'
import { BG_COLOR, BLUE_COLOR, ORANGE_COLOR } from '~/theme'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'

function Question() {
  return (
    <div>
      <Box>
        <Typography
          sx={{
            fontFamily: 'SVN-Konga Pro',
            fontSize: '48px',
            color: BLUE_COLOR,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          Frequently Asked <span style={{ color: ORANGE_COLOR, marginLeft: '8px' }}> Questions</span>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            component="img"
            src="src\assets\images\wavy.png"
            alt="Wavy Image"
            sx={{
              width: '40%'
            }}
          />
        </Box>

        {/* Q&A Box */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Accordion sx={{
            borderRadius: '36px',
            bgcolor: BG_COLOR,
            '& .MuiAccordion-root::before': {
              content: 'none'
            }
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ bgcolor: '#D3EFED', borderRadius: '15px', height: '60px', display: 'flex', alignItems: 'center' }}
            >
              <Typography sx={{ fontWeight: 600, color: BLUE_COLOR, height: '30px', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '18px' }}>How do I know if my fish is<span style={{ color: ORANGE_COLOR }}>sick? </span></Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#D6EAE8', borderRadius: '15px', mt: 2 }}>
              <Typography>
                If you are not sure if your fish is sick or not, we recommend you call and we are happy to guide you. Here are the most common physical and behavioral signs of disease in fish. If you have questions or a sick fish that requires treatment, please call us at (831) 278-1081.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{
            borderRadius: '36px',
            bgcolor: BG_COLOR,
            '&.MuiAccordion-root::before': {
              content: 'none'
            }
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ bgcolor: '#D3EFED', borderRadius: '15px', height: '60px', display: 'flex', alignItems: 'center' }}
            >
              <Typography sx={{ fontWeight: 600, color: BLUE_COLOR, height: '30px', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '18px' }}>How do you<span style={{ color: ORANGE_COLOR }}>sedate or anesthetize  </span> a fish?</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#D6EAE8', borderRadius: '15px', mt: 2 }}>
              <Typography>
                We use a powdered medicated known as Tricaine or Finquel. MS-222 has been used for many decades in ornamental fish health and is very safe and easily reversible. We use a small dose for physical exams and a higher one for surgical treatments.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{
            borderRadius: '36px',
            bgcolor: BG_COLOR,
            '&.MuiAccordion-root::before': {
              content: 'none'
            }
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ bgcolor: '#D3EFED', borderRadius: '15px', height: '60px', display: 'flex', alignItems: 'center' }}
            >
              <Typography sx={{ fontWeight: 600, color: BLUE_COLOR, height: '30px', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '18px' }}>What if my fish needs<span style={{ color: ORANGE_COLOR }}> surgical treatment?</span></Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#D6EAE8', borderRadius: '15px', mt: 2 }}>
              <Typography>
                We are able to provide high quality surgical treatment for all of our fish patients pond- or tankside! Our setup is fully mobile and we have wonderful staff ready to assist for more complicated procedures.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{
            borderRadius: '36px',
            bgcolor: BG_COLOR,
            '&.MuiAccordion-root::before': {
              content: 'none'
            }
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ bgcolor: '#D3EFED', borderRadius: '15px', height: '60px', display: 'flex', alignItems: 'center' }}
            >
              <Typography sx={{ fontWeight: 600, color: BLUE_COLOR, height: '30px', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '18px' }}>What<span style={{ color: ORANGE_COLOR }}>experience </span> do you have working with aquatic pets?</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#D6EAE8', borderRadius: '15px', mt: 2 }}>
              <Typography>
                Dr. Jessie Sanders has spent years amassing a varied background in aquatic medicine. While pursuing her B.S. in Marine Biology from the University of Rhode Island, Dr. Sanders completed over 2000 hours of volunteer work with Mystic Aquarium’s fish and invertebrate department. In addition, she completed 2 summer internships with the same department, during which she completed her senior honors research project from URI.
                <br />
                Dr. Sanders entered Tufts veterinary school with the intent of becoming an aquatic veterinarian. In addition to the typical veterinary curriculum, Dr. Sanders completed several advanced aquatic medicine courses (AQUAVET I & II, MARVET Grand Cayman) and aquatic externships (Mystic Aquarium, The Marine Mammal Center, SeaWorld Orlando, Aquatic Veterinary Services of Western NY). For more information about Dr. Sanders, see our article on "Why A Fish Vet."
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </div >
  )
}

export default Question
