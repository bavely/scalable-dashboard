import React from 'react'
import { User, Mail, Phone, Globe, MapPin, Building, X } from 'lucide-react'
import type { User as UserType } from '@/types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import type { TransitionProps } from '@mui/material/transitions'

interface ModalProps {
  open: boolean
  handleClose: () => void
  user?: UserType | null
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Modal: React.FC<ModalProps> = ({ open, handleClose, user }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      aria-labelledby="user-detail-title"
      aria-describedby="user-detail-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'visible',
        },
      }}
    >
      <DialogTitle
        id="user-detail-title"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}
      >
        <Typography variant="h6" component="span">
          User Details
        </Typography>
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          size="small"
          sx={{ ml: 1 }}
        >
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent
        dividers
        sx={{
          pt: 2,
          px: 3,
          pb: 2,
        }}
      >
        {user ? (
          <Stack spacing={4} id="user-detail-description">
            {/* Header */}
            <Box display="flex" gap={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User className='text-black' size={24} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{user.username}
                </Typography>
              </Box>
            </Box>

            {/* Contact & Info */}
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Mail size={16} />
                <Typography variant="body2">{user.email || 'N/A'}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Phone size={16} />
                <Typography variant="body2">{user.phone || 'N/A'}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Globe size={16} />
                <Typography variant="body2">{user.website || 'N/A'}</Typography>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" spacing={2} alignItems="flex-start">
                <MapPin size={16} style={{ marginTop: 4 }} />
                <Box>
                  <Typography variant="body2">
                    {user.address?.street ?? 'N/A'}, {user.address?.suite ?? ''}
                  </Typography>
                  <Typography variant="body2">
                    {user.address?.city ?? 'N/A'}, {user.address?.zipcode ?? 'N/A'}
                  </Typography>
                  {user.address?.geo && (
                    <Typography variant="caption" color="text.secondary">
                      Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Building size={16} style={{ marginTop: 4 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {user.company?.name ?? 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company?.catchPhrase ?? 'N/A'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.company?.bs ?? ''}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body1">No user selected.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button aria-label="Close" onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
