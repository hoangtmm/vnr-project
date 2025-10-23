import React from 'react';
import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { motion } from 'framer-motion';
import { stagger, item } from '../anim';

import { MapContainer as RLMapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ⬇️ Dùng L + Icon + LatLngTuple, set default icon cho Marker
import L, { Icon, LatLngTuple } from 'leaflet';

const center: LatLngTuple = [15.8, 106.0];
const mapStyle: React.CSSProperties = { height: 420 };

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// 👇 set icon mặc định => không cần truyền prop icon vào <Marker/>
(L.Marker.prototype as any).options.icon = defaultIcon;

// (nếu còn lỗi type với MapContainer, có thể alias tạm)
const MapContainer: any = RLMapContainer;

export default function CaseStudies() {
  const { lang } = useLang();
  const items = (lang === 'vi' ? VI : EN).caseStudies;

  return (
    <Section
      title={lang === 'vi' ? 'Tình huống điển hình' : 'Case studies'}
      subtitle={lang === 'vi' ? 'Bản đồ & thẻ tóm tắt' : 'Map & summary cards'}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* ...cột thẻ giữ nguyên... */}

        <div className="order-1 md:order-2 card overflow-hidden">
          <MapContainer center={center} zoom={5} style={mapStyle}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {items
              .filter((i: any) => i.lat && i.lng)
              .map((cs: any) => (
                <Marker
                  key={cs.id}
                  position={[cs.lat, cs.lng] as LatLngTuple}
                  // ❌ bỏ icon={...}
                >
                  <Popup>
                    <b>{cs.title}</b>
                    <br />
                    {cs.year}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </Section>
  );
}
