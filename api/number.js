const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  // Get phone number from query
  const { num } = req.query;
  
  // If no number provided
  if (!num) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
      usage: "https://your-app.vercel.app/?num=9876543210",
      example: "https://your-app.vercel.app/?num=9876543210",
      developer: "@Ros3_Zii",
      trial: "♾ Days",
      note: "JAI MAHAKAL 🥰"
    });
  }
  
  try {
    // Clean the number (remove non-digits)
    const cleanNum = num.toString().replace(/\D/g, '');
    
    // Call the external API
    const apiUrl = `https://api-ij32.onrender.com/lookup?match=${cleanNum}`;
    console.log('Calling API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    // Get the response text
    const responseText = await response.text();
    console.log('API Response:', responseText.substring(0, 200));
    
    // Try to parse as JSON
    let jsonData;
    try {
      jsonData = JSON.parse(responseText);
    } catch {
      // If not JSON, create a response object
      jsonData = {
        number: cleanNum,
        data: responseText,
        source: "@Ros3_Zii"
      };
    }
    
    // Add metadata to response
    const finalResponse = {
      success: true,
      number: cleanNum,
      ...jsonData,
      metadata: {
        developer: "@Ros3_Zii",
        trial_period: "♾ Days",
        note: "JAI MAHAKAL 🥰",
        timestamp: new Date().toISOString(),
        api_source: "@Ros3_Zii"
      }
    };
    
    // Send response
    return res.status(200).json(finalResponse);
    
  } catch (error) {
    console.error('Error:', error);
    
    return res.status(500).json({
      success: false,
      message: error.message,
      number: num,
      developer: "@Ros3_Zii",
      trial: "♾ Days",
      note: "JAI MAHAKAL 🥰",
      suggestion: "Try with different number or check if API is working"
    });
  }
};
