# expense-tracker

This is an expense tracker created with Next.js. It features a darker theme with the increased popularity of dark mode to allow users to have a better viewing experience.

The website is hosted on Vercel [here.](https://expense-tracker-indol-seven.vercel.app)

## Website Layout


Users will be greeted with a simple landing page with links to my socials. They can then proceed to sign in or sign up by clicking on the "Get Started" button.

<img width="1512" alt="Landing Page" src="https://github.com/user-attachments/assets/1b22b195-2ede-45a8-b9a7-36837a52236d">

Users can then sign in with their credentials or sign up via clicking the underlined text. 

<img width="1512" alt="Sign In Page" src="https://github.com/user-attachments/assets/1d729401-fa66-4116-9384-f3bfbeedd593">

Upon signing in, users will be greeting with a dashboard with charts containing information about the current month's daily expenses and incomes. Users can add transactions by clicking the button on the bottom right of the screen.

<img width="1512" alt="Expense Chart" src="https://github.com/user-attachments/assets/27b3ebc2-14f8-4dec-8bab-adacc984fa63">

<img width="1512" alt="Income Chart" src="https://github.com/user-attachments/assets/10c8b314-4e55-4ab0-8cc7-805d1d2674ed">

Users can also see their transactions by clicking on the appropriate navigation link on the bar. The transactions will be displayed from latest to earliest and also splitting them by months.

<img width="1512" alt="Screenshot 2024-08-05 at 12 44 38 PM" src="https://github.com/user-attachments/assets/3a540877-7577-4ba2-b74c-2c094bafe639">

Currently, the settings page allows for users to sign out and sign back in.

## Tech Stack

Currently, the website is built on [Next.js](https://nextjs.org/), a popular React framework, combined with [TailwindCSS](https://tailwindcss.com/) for styling. The backend is built with [Supabase](https://supabase.com/), an open-source Firebase alternative with a PostgreSQL database. [Drizzle](https://orm.drizzle.team/) was also used as a lightweight ORM to aid in database queries. Finally, [Vercel](https://vercel.com/) was used as a hosting platform for the website.
