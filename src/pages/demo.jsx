import { useEffect } from 'react';

const Demo = () => {
  useEffect(() => {
    // Fetch the embed configuration for your report (replace with your own API call)
    const fetchEmbedConfig = async () => {
      try {
        // Make API call to get the embed configuration
        const embedConfig = await fetch('your-api-endpoint-to-get-embed-config');
        
        // Use the retrieved configuration to embed the report
        const embedContainer = document.getElementById('reportContainer');
        window.powerbi.embed(embedContainer, embedConfig);
      } catch (error) {
        console.error('Failed to fetch embed configuration:', error);
      }
    };

    fetchEmbedConfig();
  }, []);

  return (
    <div>
      {/* Container to hold the embedded report */}
      <div id="reportContainer" style={{ height: '600px', width: '800px' }}></div>
    </div>
  );
};

export default Demo;
