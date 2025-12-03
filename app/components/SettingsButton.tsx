"use client"

import React, { useMemo, useState } from 'react';
import { Button, Modal, Form, Select, Input } from 'antd';
import { useApiSettingsStore } from '../store/apiSettings';
import { fetchModels } from '../api/models';

const apiTypeOptions = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'Gemini直连', value: 'gemini' },
  { label: '第三方(/v1)', value: 'custom' },
];

const SettingsButton: React.FC = () => {
  const settings = useApiSettingsStore((s) => s.settings);
  const update = useApiSettingsStore((s) => s.update);
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [models, setModels] = useState<string[]>([]);

  const [form] = Form.useForm<{ apiType: string; apiEndpoint: string; apiKey: string; model?: string }>();

  const initialValues = useMemo(
    () => ({
      apiType: settings.apiType,
      apiEndpoint: settings.apiEndpoint,
      apiKey: settings.apiKey,
      model: settings.model,
    }),
    [settings]
  );

  const handleOpen = () => {
    setOpen(true);
    form.setFieldsValue(initialValues);
  };

  const handleConnect = async () => {
    const { apiType, apiEndpoint, apiKey } = form.getFieldsValue();
    if (!apiEndpoint || !apiKey) {
      alert('请先填写API端点和密钥');
      return;
    }
    setConnecting(true);
    setConnected(false);
    setModels([]);
    try {
      const modelsList = await fetchModels(apiType as any, apiEndpoint, apiKey);
      if (modelsList.length > 0) {
        setModels(modelsList);
        setConnected(true);
      } else {
        throw new Error('未获取到模型列表');
      }
    } catch (error: any) {
      setConnected(false);
      let errorMsg = '获取模型列表失败';
      const msg = String(error?.message || '');
      if (msg.includes('Failed to fetch')) {
        errorMsg = '⚠️ 网络请求被阻止\n\n可能原因：\n1. 移动浏览器安全策略限制\n2. CORS跨域问题\n3. HTTP/HTTPS混合内容阻止\n4. 网络连接问题\n5. API端点地址不正确';
      } else {
        errorMsg = msg || errorMsg;
      }
      console.error('获取模型失败详情:', error);
      alert(errorMsg + '\n\n请检查：\n1. API端点和密钥是否正确\n2. 网络连接是否正常\n3. API服务是否支持模型列表查询');
    } finally {
      setConnecting(false);
    }
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    update({
      apiType: values.apiType as any,
      apiEndpoint: values.apiEndpoint,
      apiKey: values.apiKey,
      model: values.model,
    });
    setOpen(false);
  };

  return (
    <>
      <Button type="default" className="!rounded-button" onClick={handleOpen}>
        设置
      </Button>
      <Modal
        title="API设置"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSave}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" initialValues={initialValues}>
          <Form.Item label="API类型" name="apiType" rules={[{ required: true }]}>
            <Select options={apiTypeOptions} />
          </Form.Item>
          <Form.Item label="API端点" name="apiEndpoint" rules={[{ required: true }]}>
            <Input placeholder="https://api.openai.com/v1" />
          </Form.Item>
          <Form.Item label="API密钥" name="apiKey" rules={[{ required: true }]}>
            <Input.Password placeholder="输入API密钥" />
          </Form.Item>

          <div className="mb-3">
            <Button
              type="primary"
              loading={connecting}
              disabled={connecting}
              onClick={handleConnect}
              className="!rounded-button"
            >
              连接并获取模型{connected ? '（已连接）' : ''}
            </Button>
          </div>

          {models.length > 0 && (
            <Form.Item label="选择模型（必选）" name="model" rules={[{ required: true }]}>
              <Select options={models.map((m) => ({ label: m, value: m }))} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default SettingsButton;
