export const ProductService = {
  async getProductsData() {
      try {
          const response = await fetch('http://localhost:5000/animals/'); 
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          
          // إذا كانت البيانات تحتوي على كائن يحتوي على مصفوفة، قم بالوصول إليها.
          // مثال: { animals: [...] }
          if (Array.isArray(data)) {
              return data;
          } else if (data.animals && Array.isArray(data.animals)) {
              return data.animals; // استرجاع المصفوفة الموجودة داخل الكائن
          } else {
              throw new Error('Data is not an array or does not contain animals array');
          }
      } catch (error) {
          console.error('Error fetching products:', error);
          return []; // العودة بمصفوفة فارغة في حال حدوث خطأ
      }
  },

  async getProductsMini() {
      const data = await this.getProductsData(); // استخدام await للحصول على البيانات
      return data.slice(0, 5); // استخدام slice فقط إذا كانت البيانات مصفوفة
  },

  async getProductsSmall() {
      const data = await this.getProductsData();
      return data.slice(0, 10);
  },

  async getProducts() {
      return this.getProductsData();
  },

  async getProductsWithOrdersSmall() {
      const data = await this.getProductsWithOrdersData();
      return data.slice(0, 10);
  },

  async getProductsWithOrders() {
      return this.getProductsWithOrdersData();
  }
};
