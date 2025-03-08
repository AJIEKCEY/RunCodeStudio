import axios from 'axios'

const uploadAvatar = (
  file: string | Blob,
  onSuccess: { (data: any): void; (arg0: any): void },
  onError: { (error: any): void; (arg0: any): void }
) => {
  const url = 'https://ya-praktikum.tech/api/v2/user/profile/avatar'

  // Create a new FormData object
  const formData = new FormData()
  formData.append('avatar', file)

  // Configure Axios request
  axios
    .put(url, formData, {
      headers: {
        withCredentials: true,
      },
    })
    .then((response: { data: any }) => {
      // Call the onSuccess callback with the response data
      onSuccess(response.data)
    })
    .catch((error: any) => {
      // Call the onError callback with the error
      onError(error)
    })
}

// Example usage
const fileInput = document.querySelector('#fileInput')
// fileInput.addEventListener('change', event => {
//   const file = event.target.files[0]
//   if (file) {
//     uploadAvatar(
//       file,
//       (data: any) => console.log('Upload successful:', data),
//       (error: any) => console.error('Upload failed:', error)
//     )
//   }
// })
