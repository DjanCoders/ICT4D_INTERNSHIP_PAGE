export const  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as MM/DD/YYYY by default
  };