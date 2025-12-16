# Frontend Project Structure

```
frontEndSection/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx        # Navigation header with cart
│   │   ├── Footer.jsx        # Footer component
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   │
│   ├── pages/               # Page components (one per route)
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── AddProductPage.jsx
│   │   ├── AccountPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── AboutPage.jsx
│   │
│   ├── context/             # React Context providers
│   │   └── CartContext.jsx   # Cart state management
│   │
│   ├── hooks/               # Custom React hooks (ready for expansion)
│   │
│   ├── services/            # API services (ready for expansion)
│   │
│   ├── utils/               # Utility functions (ready for expansion)
│   │
│   ├── styles/              # Global stylesheets
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── App.jsx              # Main app routing
│   └── main.jsx             # Entry point with providers
│
├── package.json
├── vite.config.js
├── index.html
└── keyComponents/           # (Old structure - can be deleted after verification)
```

## Key Improvements

✅ **Organized by Feature** - Easy to navigate and scale
✅ **Separated Concerns** - Pages, components, context are isolated
✅ **Ready to Expand** - hooks/, services/, utils/ directories prepared
✅ **Consistent Naming** - All page components end with "Page"
✅ **Context Centralized** - CartContext in dedicated context/ folder
✅ **Cleaner Imports** - No more deep nested paths like `../../../keyComponents/`

## Routes

- `/` - Login page
- `/signup` - Sign up
- `/login` - Login
- `/home` - Home (protected)
- `/product/:id` - Product details (protected)
- `/cart` - Shopping cart (protected)
- `/addproduct` - Add product (protected)
- `/account` - Profile edit (protected)
- `/contact` - Contact form (protected)
- `/about` - About page (protected)

## Next Steps (Optional)

1. **Delete** the old `keyComponents/` folder once everything works
2. **Create API service** - Add `/src/services/api.js` for centralized API calls
3. **Add custom hooks** - Create `/src/hooks/useAuth.js`, `useProduct.js`, etc.
4. **Add utilities** - Create helper functions in `/src/utils/`
5. **Add error boundary** - Handle component errors gracefully
