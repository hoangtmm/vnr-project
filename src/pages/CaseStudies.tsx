import Section from '../components/Section';
import { useLang } from '../context/LangContext';
import * as VI from '../data/vi';
import * as EN from '../data/en';
import { motion } from 'framer-motion';
import { stagger, item } from '../anim';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Dùng type trực tiếp từ 'leaflet' để tránh “different module instance”
import { Icon, LatLngTuple } from 'leaflet';

const center: LatLngTuple = [15.8, 106.0];

const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function CaseStudies() {
  const { lang } = useLang();
  const items = (lang === 'vi' ? VI : EN).caseStudies;

  return (
    <Section
      title={lang === 'vi' ? 'Tình huống điển hình' : 'Case studies'}
      subtitle={lang === 'vi' ? 'Bản đồ & thẻ tóm tắt' : 'Map & summary cards'}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="order-2 md:order-1">
          <motion.div
            className="grid sm:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {items.map((cs) => (
              <motion.div key={cs.id} className="card p-6" variants={item}>
                <div className="text-sm muted mb-1">{cs.year}</div>
                <h3 className="h3 mb-2">{cs.title}</h3>
                <p className="text-sm">
                  <span className="font-medium">
                    {lang === 'vi' ? 'Bối cảnh' : 'Context'}:
                  </span>{' '}
                  {cs.context}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="order-1 md:order-2 card overflow-hidden">
          {/* ✅ center nhận LatLngTuple; style là prop của div bao bọc */}
          <MapContainer center={center} zoom={5} style={{ height: 420 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {items
              .filter((i: any) => i.lat && i.lng)
              .map((cs: any) => (
                <Marker
                  key={cs.id}
                  position={[cs.lat, cs.lng] as LatLngTuple} // ✅ dùng tuple
                  icon={icon} // ✅ Icon type chính xác
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
