export const AnimalService = {
  async getAnimalsData() {
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
          console.error('Error fetching animals:', error);
          return []; // العودة بمصفوفة فارغة في حال حدوث خطأ
      }
  },

  async getAnimalsMini() {
      const data = await this.getAnimalsData(); // استخدام await للحصول على البيانات
      return data.slice(0, 5); // استخدام slice فقط إذا كانت البيانات مصفوفة
  },

  async getAnimalsSmall() {
      const data = await this.getAnimalsData();
      return data.slice(0, 10);
  },

  async getAnimals() {
      return this.getAnimalsData();
  },

  async getAnimalsWithOrdersSmall() {
      const data = await this.getAnimalsWithOrdersData();
      return data.slice(0, 10);
  },

  async getAnimalsWithOrders() {
      return this.getAnimalsWithOrdersData();
  }
};
export default AnimalService;
