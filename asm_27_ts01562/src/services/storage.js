/**
 * Utility functions for localStorage operations
 */

/**
 * Get data array from localStorage
 * @param {string} key - localStorage key
 * @returns {Array} - Array of data, empty array if not exists
 */
export const getData = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error(`Error getting data from ${key}:`, error)
    return []
  }
}

/**
 * Set data array to localStorage
 * @param {string} key - localStorage key
 * @param {Array} data - Array data to store
 */
export const setData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error setting data to ${key}:`, error)
  }
}

/**
 * Get single item from localStorage
 * @param {string} key - localStorage key
 * @returns {*} - Parsed data or null
 */
export const getItem = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`Error getting item from ${key}:`, error)
    return null
  }
}

/**
 * Set single item to localStorage
 * @param {string} key - localStorage key
 * @param {*} data - Data to store
 */
export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error setting item to ${key}:`, error)
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - localStorage key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item ${key}:`, error)
  }
}

/**
 * Clear all localStorage data (except sample data if needed)
 */
export const clearAll = () => {
  try {
    const keepKeys = ['users', 'posts', 'comments', 'categories'] // Keep sample data
    const allKeys = Object.keys(localStorage)

    allKeys.forEach((key) => {
      if (!keepKeys.includes(key)) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}
