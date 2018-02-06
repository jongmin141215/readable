export const formatDate = timestamp => {
  let options = {
    hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric'
  }
  let date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', options).format(date).toString();
}
