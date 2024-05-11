### Dropdown Menu - Next.js & Tailwind CSS
- https://stackoverflow.com/questions/67806445/dropdown-menu-next-js-tailwind-css

Check out this code, you will like it....
```jsx
const [dropdownOpen, setdropdownOpen] = useState(false);
      
<div
    onClick={() => setdropdownOpen(!dropdownOpen)}
    class="overflow-hidden rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
>
    Toggle
</div>


<div
    class={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}>
    <a
        href="javascript:void(0)"
        class="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
    >
        Dashboard
    </a>
    <a
        href="javascript:void(0)"
        class="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
    >
        Settings
    </a>
    <a
        href="javascript:void(0)"
        class="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
    >
        Earnings
    </a>
    <a
        href="javascript:void(0)"
        class="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
    >
        Logout
    </a>
</div>
```