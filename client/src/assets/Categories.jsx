const Categories = [
    
      
        {
          value: 'Fast Food and Restaurants',
          label: 'Fast Food and Restaurants',
          children: [
            { value: 'Fast Food', label: 'Fast Food' },
            { value: 'Casual Dining', label: 'Casual Dining' },
            { value: 'Fine Dining', label: 'Fine Dining' },
            { value: 'Coffee Shops and Cafés', label: 'Coffee Shops and Cafés' },
            { value: 'Bakeries', label: 'Bakeries' },
          ],
        },
        {
          value: 'Clothing and Apparel',
          label: 'Clothing and Apparel',
          children: [
            { value: 'Men’s Clothing', label: 'Men’s Clothing' },
            { value: 'Women’s Clothing', label: 'Women’s Clothing' },
            { value: 'Children’s Clothing', label: 'Children’s Clothing' },
            { value: 'Sportswear', label: 'Sportswear' },
            { value: 'Accessories', label: 'Accessories (e.g., Bags, Jewelry, Shoes)' },
          ],
        },
        {
          value: 'Electronics and Gadgets',
          label: 'Electronics and Gadgets',
          children: [
            { value: 'Smartphones and Accessories', label: 'Smartphones and Accessories' },
            { value: 'Computers and Laptops', label: 'Computers and Laptops' },
            { value: 'Home Appliances', label: 'Home Appliances' },
            { value: 'Audio and Video Equipment', label: 'Audio and Video Equipment' },
          ],
        },
        {
          value: 'Health and Beauty',
          label: 'Health and Beauty',
          children: [
            { value: 'Cosmetics and Skincare', label: 'Cosmetics and Skincare' },
            { value: 'Personal Care Products', label: 'Personal Care Products' },
            { value: 'Pharmaceuticals', label: 'Pharmaceuticals' },
            { value: 'Fitness and Wellness Products', label: 'Fitness and Wellness Products' },
          ],
        },
        {
          value: 'Home and Garden',
          label: 'Home and Garden',
          children: [
            { value: 'Furniture', label: 'Furniture' },
            { value: 'Home Décor', label: 'Home Décor' },
            { value: 'Garden Supplies', label: 'Garden Supplies' },
            { value: 'Kitchenware and Appliances', label: 'Kitchenware and Appliances' },
          ],
        },
        {
          value: 'Sports and Outdoors',
          label: 'Sports and Outdoors',
          children: [
            { value: 'Sports Equipment', label: 'Sports Equipment' },
            { value: 'Outdoor Gear', label: 'Outdoor Gear' },
            { value: 'Fitness Apparel', label: 'Fitness Apparel' },
          ],
        },
        {
          value: 'Services',
          label: 'Services',
          children: [
            {
              value: 'Professional Services',
              label: 'Professional Services',
              children: [
                { value: 'Legal Services', label: 'Legal Services' },
                { value: 'Accounting and Financial Services', label: 'Accounting and Financial Services' },
                { value: 'Consulting Services', label: 'Consulting Services' },
              ],
            },
            {
              value: 'Health Services',
              label: 'Health Services',
              children: [
                { value: 'Medical Clinics', label: 'Medical Clinics' },
                { value: 'Dental Services', label: 'Dental Services' },
                { value: 'Veterinary Services', label: 'Veterinary Services' },
              ],
            },
            {
              value: 'Education and Training',
              label: 'Education and Training',
              children: [
                { value: 'Schools and Colleges', label: 'Schools and Colleges' },
                { value: 'Tutoring Services', label: 'Tutoring Services' },
                { value: 'Online Courses', label: 'Online Courses' },
              ],
            },
            {
              value: 'Travel and Hospitality',
              label: 'Travel and Hospitality',
              children: [
                { value: 'Hotels and Accommodations', label: 'Hotels and Accommodations' },
                { value: 'Travel Agencies', label: 'Travel Agencies' },
                { value: 'Tour Operators', label: 'Tour Operators' },
              ],
            },
            {
              value: 'Entertainment',
              label: 'Entertainment',
              children: [
                { value: 'Movie Theaters', label: 'Movie Theaters' },
                { value: 'Gaming', label: 'Gaming (e.g., Video Games, Arcades)' },
                { value: 'Music and Performing Arts', label: 'Music and Performing Arts' },
              ],
            },
            {
              value: 'Real Estate',
              label: 'Real Estate',
              children: [
                { value: 'Property Sales and Rentals', label: 'Property Sales and Rentals' },
                { value: 'Property Management', label: 'Property Management' },
                { value: 'Real Estate Investment', label: 'Real Estate Investment' },
              ],
            },
            {
              value: 'Technology and Innovation',
              label: 'Technology and Innovation',
              children: [
                {
                  value: 'Software and Apps',
                  label: 'Software and Apps',
                  children: [
                    { value: 'SaaS', label: 'SaaS (Software as a Service)' },
                    { value: 'Mobile Apps', label: 'Mobile Apps' },
                    { value: 'Web Development', label: 'Web Development' },
                  ],
                },
                {
                  value: 'Tech Hardware',
                  label: 'Tech Hardware',
                  children: [
                    { value: 'Consumer Electronics', label: 'Consumer Electronics' },
                    { value: 'IT Equipment', label: 'IT Equipment' },
                    { value: 'Smart Home Devices', label: 'Smart Home Devices' },
                  ],
                },
                {
                  value: 'Innovation and Research',
                  label: 'Innovation and Research',
                  children: [
                    { value: 'R&D', label: 'R&D (Research and Development)' },
                    { value: 'Biotechnology', label: 'Biotechnology' },
                    { value: 'Green Technologies', label: 'Green Technologies' },
                  ],
                },
              ],
            },
            {
              value: 'Manufacturing and Industry',
              label: 'Manufacturing and Industry',
              children: [
                {
                  value: 'Industrial Equipment',
                  label: 'Industrial Equipment',
                  children: [
                    { value: 'Machinery and Tools', label: 'Machinery and Tools' },
                    { value: 'Manufacturing Equipment', label: 'Manufacturing Equipment' },
                  ],
                },
              ],
            },
            {
              value: 'Automotive',
              label: 'Automotive',
              children: [
                {
                  value: 'Vehicle Manufacturing',
                  label: 'Vehicle Manufacturing',
                  children: [
                    { value: 'Auto Parts and Accessories', label: 'Auto Parts and Accessories' },
                    { value: 'Repair Services', label: 'Repair Services' },
                  ],
                },
              ],
            },
            {
              value: 'Construction and Building Materials',
              label: 'Construction and Building Materials',
              children: [
                { value: 'Building Materials', label: 'Building Materials' },
                { value: 'Construction Services', label: 'Construction Services' },
                { value: 'Home Improvement', label: 'Home Improvement' },
              ],
            },
            {
              value: 'Finance and Insurance',
              label: 'Finance and Insurance',
              children: [
                {
                  value: 'Banking',
                  label: 'Banking',
                  children: [
                    { value: 'Personal Banking', label: 'Personal Banking' },
                    { value: 'Business Banking', label: 'Business Banking' },
                    { value: 'Investment Banking', label: 'Investment Banking' },
                  ],
                },
                {
                  value: 'Insurance',
                  label: 'Insurance',
                  children: [
                    { value: 'Life Insurance', label: 'Life Insurance' },
                    { value: 'Health Insurance', label: 'Health Insurance' },
                    { value: 'Property and Casualty Insurance', label: 'Property and Casualty Insurance' },
                  ],
                },
              ],
            },
            {
              value: 'Food and Beverage',
              label: 'Food and Beverage',
              children: [
                {
                  value: 'Food Products',
                  label: 'Food Products',
                  children: [
                    { value: 'Packaged Foods', label: 'Packaged Foods' },
                    { value: 'Beverages', label: 'Beverages (e.g., Soft Drinks, Alcohol)' },
                    { value: 'Specialty Foods', label: 'Specialty Foods' },
                  ],
                },
                {
                  value: 'Organic Foods',
                  label: 'Organic Foods',
                  children: [
                    { value: 'Gourmet Foods', label: 'Gourmet Foods' },
                  ],
                },
              ],
            },
            {
              value: 'Miscellaneous',
              label: 'Miscellaneous',
              children: [
                {
                  value: 'Arts and Crafts',
                  label: 'Arts and Crafts',
                  children: [
                    { value: 'Art Supplies', label: 'Art Supplies' },
                    { value: 'Handmade Crafts', label: 'Handmade Crafts' },
                  ],
                },
                {
                  value: 'Pet Supplies and Services',
                  label: 'Pet Supplies and Services',
                  children: [
                    { value: 'Pet Food', label: 'Pet Food' },
                    { value: 'Pet Care Services', label: 'Pet Care Services' },
                  ],
                },
                {
                  value: 'Transportation',
                  label: 'Transportation',
                  children: [
                    { value: 'Logistics and Shipping', label: 'Logistics and Shipping' },
                    { value: 'Public Transport', label: 'Public Transport' },
                  ],
                },
              ],
            },
          ],
        },
      
    
  ];
  
  export default Categories;
  