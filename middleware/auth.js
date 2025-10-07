export default function ({ redirect }) {
  if (process.client) {
    const user = localStorage.getItem('user');
    if (!user) {
      redirect('/login');
    }
  }
}